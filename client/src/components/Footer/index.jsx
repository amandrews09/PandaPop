import './footer.css';

export default function Footer() {
  const styles = {
    footer: {
      position: 'relative',
      bottom: '0',
      width: '100%'
    },
    ul: {
      width: '5%'
    },
    panda: {
      width: '2vw',
      marginBottom: '2vh'
    },
    p: {
      fontSize: '.7em'
    }
  };

  return (
    <footer style={styles.footer} className="d-flex flex-column align-items-center">
      <img style={styles.panda} src="../public/images/pandapop-icon.png" alt="" />
      <ul style={styles.ul} className="nav d-flex justify-content-between">
       <a href="https://www.linkedin.com/in/amanda-andrews-4baa72290"><li className="bi bi-linkedin icon"></li></a> 
        <a href="https://www.instagram.com/amandrewsart/"><li className="bi bi-instagram icon"></li></a>
        <a href="mailto:amandrews09@gmail.com"><li className="bi bi-envelope icon"></li></a>
      </ul>
      <p style={styles.p}> &#169; Amanda Andrews 2024. All rights reserved </p>
    </footer>
  );
}
