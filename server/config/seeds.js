const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Food' },
    { name: 'Household Supplies' },
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Toys' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Ariel',
      description: 
        'The statue depicts Ariel, the iconic character from "The Little Mermaid," reimagined in a vibrant pop art style. Bold, contrasting colors and graphic patterns bring a modern, dynamic energy to the classic figure, blending nostalgia with contemporary artistic flair.',
      image: 'Ariel.jpg',
      category: categories[0]._id,
      price: 35,
      quantity: 1
    },
    {
      name: 'Fairy',
      description:
        'This delightful fairy statue is a perfect addition to any whimsical decor or fairy garden. Sitting gracefully on a tree stump, the fairy is beautifully crafted and painted in a striking pop art style. Her vibrant dress features bold shades of green and orange with playful polka dots, while her wings are a kaleidoscope of bright colors and patterns. With flowing blonde hair and a serene expression, she exudes a charming, ethereal presence. The detailed tree stump base adds a natural touch, making this piece a captivating blend of fantasy and contemporary art. Ideal for collectors and fairy enthusiasts, it brings a touch of magic and vibrant color to any space.',
      image: 'Fairy.jpg',
      category: categories[0]._id,
      price: 30,
      quantity: 1
    },
    {
      name: 'Fairy Tree House',
      category: categories[1]._id,
      description:
        'This enchanting fairy house statue is a perfect blend of whimsy and vibrant pop art style. The house is intricately designed with a tree stump base and a leafy green roof, adorned with colorful, stylized insects, including a dragonfly and ladybugs. The front door is a patchwork of bold, contrasting patterns and colors, giving it a playful, eye-catching appeal. Accentuated with red toadstools and a cheerful, multi-colored snail, this piece radiates charm and creativity. Ideal for fairy garden enthusiasts or as a unique decorative piece, it brings a touch of magic and contemporary art to any space.',
      image: 'FairyHouse1.jpg',
      price: 50,
      quantity: 1
    },
    {
      name: 'Blossom Fairy House',
      category: categories[1]._id,
      description:
        'This charming fairy house statue is a delightful fusion of fantasy and pop art, perfect for any whimsical decor or fairy garden. Crafted to resemble a cozy tree house, it features a textured bark-like base with entwined branches and vibrant, oversized flowers. The roof is adorned with large, colorful blossoms, and the whimsical door is painted in a patchwork of bright, contrasting hues, adding a playful touch. The intricate detailing and bold, vivid colors bring a lively, enchanting feel to this piece. Ideal for fairy enthusiasts and collectors, it adds a splash of magic and contemporary artistry to any space.',
      image: 'FairyHouse2.jpg',
      price: 65,
      quantity: 1
    },
    {
      name: 'Fairy House with Blueberry Expansion',
      category: categories[1]._id,
      description:
        'A captivating piece that blends fantasy with vibrant pop art. This intricately designed fairy house features a charming two-story structure with a whimsical pink flower roof dripping with golden nectar, adding a touch of enchantment. Adjacent to the main house is a delightful blueberry extension, complete with a brightly painted door and playful ladybug and snail accents. The vivid colors and detailed craftsmanship bring this fairy abode to life, making it a perfect centerpiece for any fairy garden or whimsical decor.',
      image: 'FairyHouse3.jpg',
      price: 70,
      quantity: 1
    },
    {
      name: 'Giraffe',
      category: categories[2]._id,
      description:
        'This delightful piece features a giraffe sitting gracefully, its long neck adorned with a playful patchwork of vibrant colors and bold patterns. Each section of the giraffe body is painted in a different hue, including bright oranges, blues, pinks, and greens, with fun details like polka dots, stars, and hearts. The giraffe has a cheerful expression and whimsical design, complete with a small crown on its head, makes it a standout piece that brings a touch of joy and artistic flair to any space.',
      image: 'Giraffe.jpg',
      price: 40,
      quantity: 1
    },
    {
      name: 'No Drama Llama',
      category: categories[2]._id,
      description:
        'This adorable piece showcases a llama in a playful pop art style, featuring a vibrant patchwork of colors and patterns. With a delightful mix of pinks, blues, oranges, and greens, each section is decorated with fun designs like polka dots, stripes, and hearts, adding a whimsical touch. The llama has a sweet expression and cheerful appearance making it an eye-catching and heartwarming addition to your home decor.',
      image: 'Llama.jpg',
      price: 25,
      quantity: 1
    },
    {
      name: 'Seaside Mermaid',
      category: categories[3]._id,
      description:
        'This captivating piece features a beautifully crafted mermaid reclining on a rock, her long hair flowing in bold, vibrant hues of orange and red. Her top and tail are adorned with striking patterns and colors, including bright greens and blues, making her stand out as a true work of pop art. The base is decorated with charming details like a starfish and seashells, adding to the enchanting seaside scene.',
      image: 'Mermaid.jpg',
      price: 40,
      quantity: 1
    },
    {
      name: 'Mouse Entertainer',
      category: categories[4]._id,
      description: 'Add a touch of nostalgic charm and modern flair to your collection with this mouse. This vibrant statue features a beloved classic character, reimagined in a playful pop art style. With a bright, multi-colored outfit, including red shorts, a yellow shoe, and a blue polka-dotted shoe, this figurine stands out with its bold patterns and vivid hues.',
      image: 'Mickey.jpg',
      price: 150,
      quantity: 1
    },
    {
      name: 'Mushroom Fairy House',
      category: categories[4]._id,
      description:
        'This enchanting statue features a large mushroom house with a bright red cap, adorned with playful details like a cheerful green caterpillar, vibrant purple mushrooms, and blooming flowers. The door is painted in a lively mix of colors and patterns, adding to the fairy tale charm. Surrounding the house are adorable accents, including ladybugs, enhancing the overall magical feel.',
      image: 'Mushroom.jpg',
      price: 30,
      quantity: 1
    },
    {
      name: 'Snail',
      category: categories[4]._id,
      description:
        'Brighten up your space with this delightful and whimsical addition to any decor. This adorable snail is painted in a vibrant pop art style, featuring a sunny yellow body and a colorful, patterned shell. The shell boasts a playful patchwork of bright hues and fun designs, including polka dots, hearts, and stripes, making it a true standout piece. The snail has a cheerful expression and quirky design adding a touch of joy and artistic flair to any room.',
      image: 'Snail.jpg',
      price: 25,
      quantity: 1
    },
    {
      name: 'Turtle',
      category: categories[4]._id,
      description:
        'Add a touch of colorful whimsy to your decor. This charming statue features a turtle with a lively, patchwork shell adorned with a mix of bright colors and playful patterns. Each segment of the shell is uniquely designed, incorporating fun elements like polka dots, geometric shapes, and bold hues. The turtle has a cheerful expression and vivid green body to bring an extra layer of joy to this delightful piece.',
      image: 'Turtle.jpg',
      price: 30,
      quantity: 1
    },
    {
      name: 'Mamala',
      category: categories[4]._id,
      description:
        'This unique vase features a classic shape with a contemporary twist, showcasing a vibrant patchwork design at the base. The colorful segments are decorated with playful patterns, including stars, stripes, and polka dots in bright hues of yellow, pink, green, and orange. The contrast between the vivid patchwork and the smooth, lavender upper portion of the vase creates a striking visual effect. Perfect for displaying fresh flowers or as a standalone decorative piece.',
      image: 'Vase.jpg',
      price: 75,
      quantity: 0
    }
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
