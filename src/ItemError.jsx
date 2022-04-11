const ItemError = ({ message }) => {
  return (
    <>
      <article
        style={{
          border: "1px solid #999",
          margin: "1rem",
        }}
      >
        <p style={{ backgroundColor: "#800" }}>{message}</p>
      </article>
    </>
  )
}

export default ItemError
