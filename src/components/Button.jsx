export default function Button({content, style}) {

  const button_class = `${content.color}`;

  if (content.type = 'button') {
  } else {
    return (
      <>
        <NavLink to={ content.link } end
          className={ button_class }
        >
          { content.text }
        </NavLink>
      </>
    );
  }
}