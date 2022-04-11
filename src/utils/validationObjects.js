import * as yup from "yup"
import { roundTwoDecimal } from "./validations"

export const packageSchema = yup.object().shape({
  vehiculo: yup.string().min(3).max(30).required("VEHICULO es requerido"),
  servicio: yup.string().min(3).max(4).required("SERVICIO es requerido"),
  paquete: yup
    .string()
    .min(3)
    .max(18, "PAQUETE maximo 18 caracteres")
    .required("PAQUETE es requerido"),
  operacion: yup.string().min(2).max(4).required("OPERACIÓN es requerido"),
  qty: yup.number().positive().max(99.9).required("QTY es requerido"),
  monto: yup
    .number()
    .positive()
    .max(99999.99)
    .required("MONTO es requerido")
    .transform(value => roundTwoDecimal(value)),
  descripcionServicio: yup
    .string()
    .min(3)
    .max(150, "DESCRIPCION maximo 150 caracteres")
    .required("DESCRIPCION es requerido"),
  modelo1: yup.number().positive().min(2000).integer().required("MODELO 1 es requerido"),
  modelo2: yup.number().positive().min(2000).integer().required("MODELO 2 es requerido"),
  codigoEreact: yup.string().min(3).max(10).required("CODIGO EREACT es requerido"),
  precioPaquete: yup
    .number()
    .positive()
    .min(1)
    .required("PRECIO DE PAQUETE (PP) es requerido")
    .transform(value => roundTwoDecimal(value)),
})

export const varSchema = yup.object().shape({
  vehiculo: yup.string().min(3).max(30).required("VEHICULO es requerido"),
  servicio: yup.string().min(3).max(4).required("SERVICIO es requerido"),
  paquete: yup
    .string()
    .min(3)
    .max(18, "PAQUETE maximo 18 caracteres")
    .required("PAQUETE es requerido"),
  operacion: yup
    .string()
    .required("OPERACIÓN es requerido")
    .oneOf(["VA", "MAT"], "OPERACIÓN debe ser VA o MAT"),
  tiempo: yup.string().max(0, "TIEMPO no aplica"),
  monto: yup.number().max(0, "MONTO no es requerido"),
  descripcion: yup
    .string()
    .min(3)
    .max(150, "DESCRIPCION maximo 150 caracteres")
    .required("DESCRIPCION es requerido"),
  codigoEreact: yup.string().min(3).max(10).required("CODIGO EREACT es requerido"),
})

export const refSchema = yup.object().shape({
  vehiculo: yup.string().min(3).max(30).required("VEHICULO es requerido"),
  servicio: yup.string().min(3).max(4).required("SERVICIO es requerido"),
  paquete: yup
    .string()
    .min(3)
    .max(18, "PAQUETE maximo 18 caracteres")
    .required("PAQUETE es requerido"),
  parte: yup.string().min(2).max(27).required("PARTE es requerido"),
  qty: yup
    .number()
    .positive()
    .integer()
    .max(9, "QTY debe ser maximo 9")
    .required("QTY es requerido"),
  precioUnitario: yup
    .number()
    .positive()
    .max(99999.99)
    .required("PRECIO UNITARIO es requerido")
    .transform(value => roundTwoDecimal(value)),
  descripcion: yup
    .string()
    .min(3)
    .max(150, "DESCRIPCION maximo 150 caracteres")
    .required("DESCRIPCION es requerido"),
})

export const mapMO = {
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
  PP: "precioPaquete",
}

export const mapVA = {
  VEHICULO: "vehiculo",
  SERVICIO: "servicio",
  PAQUETE: "paquete",
  OPERACIÓN: "operacion",
  TIEM: "tiempo",
  MONTO: "monto",
  DESCRIPCION: "descripcion",
  "CODIGO EREACT": "codigoEreact",
}

export const mapREF = {
  VEHICULO: "vehiculo",
  SERVICIO: "servicio",
  PAQUETE: "paquete",
  PARTE: "parte",
  QTY: "qty",
  "PRECIO UNITARIO": "precioUnitario",
  DESCRIPCION: "descripcion",
}
