import { useState } from "react"
import readXlsxFile, { readSheetNames } from "read-excel-file"
import * as yup from "yup"

const packageSchema = yup.object().shape({
  vehiculo: yup.string().min(3).max(30).required("VEHICULO es requerido"),
  servicio: yup.string().min(3).max(4).required("SERVICIO es requerido"),
  paquete: yup
    .string()
    .min(3)
    .max(18, "PAQUETE maximo 18 caracteres")
    .required("PAQUETE es requerido"),
  operacion: yup.string().min(2).max(4).required(),
  qty: yup.number().positive().min(0.1).max(99.9).required(),
  monto: yup.number().positive().min(0.01).max(99999.99).required(),
  descripcionServicio: yup
    .string()
    .min(3)
    .max(150)
    .required("DESCRIPCION es requerido"),
  modelo1: yup.number().positive().min(2000).integer().required(),
  modelo2: yup.number().positive().min(2000).integer().required(),
  codigoEreact: yup
    .string()
    .min(3)
    .max(10)
    .required("CODIGO EREACT es requerido"),
})

const map = {
  VEHICULO: "vehiculo",
  SERVICIO: "servicio",
  PAQUETE: "paquete",
  OPERACIÓN: "operacion",
  QTY: "qty",
  MONTO: "monto",
  "DESCRIPCION SERVICIO": "descripcionServicio",
  "MODELO 1": "modelo1",
  "MODELO 2": "modelo2",
  "CODIGO EREACT": "codigoEreact",
}

const ReadFile = (props) => {
  const [data, setData] = useState([])
  const [onlyErrors, setOnlyErrors] = useState(false)

  const handleUpload = async (e) => {
    e.preventDefault()
    const sheetsName = await readSheetNames(input.files[0])
    const fileReaded = await readXlsxFile(input.files[0], {
      sheet: "DMS-MO 14",
      map,
    })

    const { rows } = fileReaded
    // console.log(rows)

    const validationPackage = await Promise.all(
      rows.map(async (row, index) => {
        let value, errAcum
        try {
          value = await packageSchema.validate(row, { abortEarly: false })
        } catch (error) {
          // console.log(error)
          // return error
          errAcum = error.errors
        }
        return { value, errors: errAcum, row: index + 2 }
      })
    )

    // console.log(validationPackage)
    setData(validationPackage)
  }

  const clearFile = () => {
    setData("")
  }

  const handleOnlyErrors = () => {
    setOnlyErrors((prevStatus) => !prevStatus)
  }

  console.log(data)

  return (
    <div>
      <h3>Read File</h3>
      <form onSubmit={handleUpload}>
        <input type="file" id="input" />
        <br />
        <button>Check File</button>
      </form>
      <h3>
        Total de paquetes: {data.length} Correctos:{" "}
        {data.filter((row) => row.value).length} Errores:{" "}
        {data.filter((row) => row.errors).length}
      </h3>
      <button onClick={handleOnlyErrors}>
        {onlyErrors ? "Mostrar todo" : "Mostrar solo errores"}
      </button>
      <div>
        {data.map(({ errors, row, value }) => {
          if (!errors) {
            return onlyErrors ? null : (
              <p
                key={row}
                style={{
                  border: "1px solid #999",
                  margin: "1rem",
                  backgroundColor: "#0a0",
                }}
              >
                <span>Linea {row} correta: </span>
                {value.paquete}
              </p>
            )
          } else {
            return (
              <p key={row} style={{ border: "1px solid #999", margin: "1rem" }}>
                <span>Linea {row} --Error--</span>
                {errors.map((e) => (
                  <div key={e} style={{ backgroundColor: "#800" }}>
                    {e}
                  </div>
                ))}
              </p>
            )
          }
        })}
      </div>
    </div>
  )
}

export default ReadFile
