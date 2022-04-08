import { useState } from "react"
import readXlsxFile, { readSheetNames } from "read-excel-file"
import * as yup from "yup"
import ItemMO from "./ItemMO"
import {
  packageSchema,
  mapMO,
  varSchema,
  mapVA,
  refSchema,
  mapREF,
} from "./utils/validationObjects"

const ReadFile = () => {
  const [data, setData] = useState([])
  const [dataVA, setDataVA] = useState([])
  const [dataREF, setDataREF] = useState([])
  const [onlyErrors, setOnlyErrors] = useState(false)
  const [fileName, setFileName] = useState("Selecciona un archivo...")
  const [globalError, setGlobalError] = useState(null)

  const handleUpload = async e => {
    e.preventDefault()

    let rows = []
    let rowsVA = []
    let rowsREF = []

    try {
      setGlobalError(null)
      const sheetsName = await readSheetNames(input.files[0])
      const fileReaded = await readXlsxFile(input.files[0], {
        sheet: "DMS-MO 14",
        map: mapMO,
      })
      const sheetVA = await readXlsxFile(input.files[0], {
        sheet: "DMS-VARIOS 14",
        map: mapVA,
      })
      const sheetREF = await readXlsxFile(input.files[0], {
        sheet: "DMS-REF 14",
        map: mapREF,
      })

      rows = fileReaded.rows
      rowsVA = sheetVA.rows
      rowsREF = sheetREF.rows
    } catch (error) {
      setGlobalError({ msg: "Archivo invalido!!!", error: error.message })
    }

    // console.log(rows)

    // -- validation of sheet MO
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
    // -- validation of sheet VA
    const validationVA = await Promise.all(
      rowsVA.map(async (row, index) => {
        let value, errAcum
        try {
          value = await varSchema.validate(row, { abortEarly: false })
        } catch (error) {
          // console.log(error)
          // return error
          errAcum = error.errors
        }
        return { value, errors: errAcum, row: index + 2 }
      })
    )
    // -- validation of sheet REF
    const validationREF = await Promise.all(
      rowsREF.map(async (row, index) => {
        let value, errAcum
        try {
          value = await refSchema.validate(row, { abortEarly: false })
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
    setDataVA(validationVA)
    setDataREF(validationREF)
    setFileName(input.files[0].name)
  }

  const clearFile = () => {
    setData("")
  }

  const handleOnlyErrors = () => {
    setOnlyErrors(prevStatus => !prevStatus)
  }

  // console.log(data)

  return (
    <div>
      <h3>Read File</h3>
      <form onSubmit={handleUpload}>
        <input type="file" id="input" />
        <br />
        <button>Check File</button>
      </form>
      <h3>Archivo: {fileName}</h3>
      {globalError ? (
        <p>
          {globalError.msg}
          <br />
          {globalError.error}
        </p>
      ) : (
        <>
          <h3>
            Total de paquetes: {data.length} Correctos: {data.filter(row => row.value).length}{" "}
            Errores: {data.filter(row => row.errors).length}
          </h3>
          <button onClick={handleOnlyErrors}>
            {onlyErrors ? "Mostrar todo" : "Mostrar solo errores"}
          </button>
          <section>
            <h3>Resumen de -- DMS-MO 14 --</h3>
            {data.map(itemMO => (
              <ItemMO key={itemMO.row} data={itemMO} onlyErrors={onlyErrors} />
            ))}
          </section>
          <section>
            <h3>Resumen de -- DMS-VARIOS 14 --</h3>
            {dataVA.map(itemVA => (
              <ItemMO key={itemVA.row} data={itemVA} onlyErrors={onlyErrors} />
            ))}
          </section>
          <section>
            <h3>Resumen de -- DMS-REF 14 --</h3>
            {dataREF.map(itemREF => (
              <ItemMO key={itemREF.row} data={itemREF} onlyErrors={onlyErrors} />
            ))}
          </section>
        </>
      )}
    </div>
  )
}

export default ReadFile
