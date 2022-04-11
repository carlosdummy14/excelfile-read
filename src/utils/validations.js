export const validateMOvsVA = (arrayMO, arrayVA) => {
  const errors = []
  if (arrayMO.length !== arrayVA.length) {
    errors.push(`Numero de paquetes no es el mismo. MO: ${arrayMO.length} VA: ${arrayVA.length}`)
  }

  for (const itemMO of arrayMO) {
    let itemExistInVA = false
    const keyToCheckMO = `${itemMO.value?.vehiculo}|${itemMO.value?.servicio}|${itemMO.value?.paquete}`
    for (const itemVA of arrayVA) {
      const keyToCheckVA = `${itemVA.value?.vehiculo}|${itemVA.value?.servicio}|${itemVA.value?.paquete}`
      if (keyToCheckMO === keyToCheckVA && !itemExistInVA) itemExistInVA = true
    }
    if (!itemExistInVA) errors.push(`Paquete ${itemMO.value?.paquete} no existe en VA`)
  }

  for (const itemVA of arrayVA) {
    let itemExistInMO = false
    const keyToCheckVA = `${itemVA.value?.vehiculo}|${itemVA.value?.servicio}|${itemVA.value?.paquete}`
    for (const itemMO of arrayMO) {
      const keyToCheckMO = `${itemMO.value?.vehiculo}|${itemMO.value?.servicio}|${itemMO.value?.paquete}`
      if (keyToCheckVA === keyToCheckMO && !itemExistInMO) itemExistInMO = true
    }
    if (!itemExistInMO) errors.push(`Paquete ${itemVA.value?.paquete} no existe en MO`)
  }
  return errors
}

export const validateMOvsREF = (arrayMO, arrayREF) => {
  const errors = []

  const keysMO = []
  for (const itemMO of arrayMO) {
    const key = `${itemMO.value?.vehiculo}|${itemMO.value?.servicio}|${itemMO.value?.paquete}`
    if (!keysMO.includes(key)) keysMO.push(key)
  }
  const keysREF = []
  for (const itemREF of arrayREF) {
    const key = `${itemREF.value?.vehiculo}|${itemREF.value?.servicio}|${itemREF.value?.paquete}`
    if (!keysREF.includes(key)) keysREF.push(key)
  }

  if (keysMO.length !== keysREF.length) {
    errors.push(`Numero de paquetes no es el mismo. MO: ${keysMO.length} REF: ${keysREF.length}`)
  }

  for (const itemMO of keysMO) {
    let itemExistInREF = false
    for (const itemREF of keysREF) {
      if (itemMO === itemREF && !itemExistInREF) itemExistInREF = true
    }
    if (!itemExistInREF) errors.push(`Paquete ${itemMO.split("|")[2]} no existe en REF`)
  }

  for (const itemREF of keysREF) {
    let itemExistInMO = false
    for (const itemMO of keysMO) {
      if (itemREF === itemMO && !itemExistInMO) itemExistInMO = true
    }
    if (!itemExistInMO) errors.push(`Paquete ${itemREF.split("|")[2]} no existe en MO`)
  }

  return errors
}

export const validatePackagePrice = (arrayMO, arrayREF) => {
  const errors = []

  const keysMO = []
  for (const itemMO of arrayMO) {
    const key = {
      paquete: `${itemMO.value?.vehiculo}|${itemMO.value?.servicio}|${itemMO.value?.paquete}`,
      precioMO: itemMO.value?.monto || 0,
      precioPaquete: itemMO.value?.precioPaquete || 0,
    }
    if (!keysMO.includes(key)) keysMO.push(key)
  }
  let keysREF = {}
  for (const itemREF of arrayREF) {
    const key = `${itemREF.value?.vehiculo}|${itemREF.value?.servicio}|${itemREF.value?.paquete}`
    const value = itemREF.value?.qty * itemREF.value?.precioUnitario || 0

    keysREF = {
      ...keysREF,
      [key]: roundTwoDecimal((keysREF[key] || 0) + value),
    }
  }

  for (const itemMO of keysMO) {
    const totalCost = roundTwoDecimal((itemMO.precioMO || 0) + keysREF[itemMO.paquete])
    const totalWithTax = roundTwoDecimal(totalCost * 1.16)
    const diff = roundTwoDecimal(itemMO.precioPaquete - totalWithTax)
    if (diff !== 0) {
      errors.push(
        `${itemMO.paquete.split("|")[2]} -> MO: ${itemMO.precioMO}, REF: ${
          keysREF[itemMO.paquete]
        }, TOT: ${totalCost}, ESPERADO: ${
          itemMO.precioPaquete
        }, CALCULADO: ${totalWithTax}, DIF: ${diff}`
      )
    }
  }

  return errors
}

export function roundTwoDecimal(num) {
  return Math.trunc(num * 100) / 100
}
