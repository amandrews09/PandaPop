const { User, Product, Category, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    checkout: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      const url = new URL(context.headers.referer).origin;
      const productQuantities = new Map(
        args.products.map(({ productId, quantity }) => [productId, quantity])
      );
      const order = await Order.create({
        products: Array.from(productQuantities.keys()),
      });
      await Order.populate(order, { path: "products" });
      // eslint-disable-next-line camelcase
      const line_items = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const product of order.products) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`],
            },
            unit_amount: product.price * 100,
          },
          quantity: productQuantities.get(product._id.toString()),
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    completeCheckout: async (parent, { sessionId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      const session= await stripe.checkout.sessions.retrieve(sessionId)
      console.log (session)
      // const order = new Order({ products });

      // await User.findByIdAndUpdate(context.user._id, {
      //   $push: { orders: order },
      // });

      // return order;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    // updateProduct: async (parent, { _id, quantity }) => {
    //   const decrement = Math.abs(quantity) * -1;

    //   return await Product.findByIdAndUpdate(
    //     _id,
    //     { $inc: { quantity: decrement } },
    //     { new: true }
    //   );
    // },
    // updateProductQuantities: async (parent, { updates }) => {
    //   const updatedProducts = [];

    //   for (let update of updates) {
    //     const updatedProduct = await Product.findByIdAndUpdate(
    //       update._id,
    //       { quantity: update.quantity },
    //       { new: true }
    //     );
    //     updatedProducts.push(updatedProduct);
    //   }

    //   return updatedProducts;
    // },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
