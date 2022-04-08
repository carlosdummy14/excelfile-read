const ItemMO = ({ data: { errors, row, value }, onlyErrors }) => {
  if (!errors) {
    return onlyErrors ? null : (
      <article
        key={row}
        style={{
          border: "1px solid #999",
          margin: "1rem",
          backgroundColor: "#0a0",
        }}
      >
        <p>
          Linea {row} correta: <span>{value.paquete}</span>
        </p>
      </article>
    )
  } else {
    return (
      <article key={row} style={{ border: "1px solid #999", margin: "1rem" }}>
        <p>Linea {row} --Error--</p>
        {errors.map(e => (
          <p key={e} style={{ backgroundColor: "#800" }}>
            {e}
          </p>
        ))}
      </article>
    )
  }
}

export default ItemMO
