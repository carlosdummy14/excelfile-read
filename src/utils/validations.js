export const validateMOvsVA = (arrayMO, arrayVA) => {
  const errors = []
  if (arrayMO.length !== arrayVA.length) {
    errors.push(`Numero de paquetes no es el mismo. MO: ${arrayMO.length} VA: ${arrayVA.length}`)
  }

  for (const itemMO of arrayMO) {
    let itemExistInVA = false
    const keyToCheckMO = `${itemMO.value?.vehiculo}|${itemMO.value?.servicio}|${itemMO.value?.paquete}`
    console.log("MO: ", keyToCheckMO)
    for (const itemVA of arrayVA) {
      const keyToCheckVA = `${itemVA.value?.vehiculo}|${itemVA.value?.servicio}|${itemVA.value?.paquete}`
      console.log("VA: ", keyToCheckVA)
      if (keyToCheckMO === keyToCheckVA && !itemExistInVA) itemExistInVA = true
    }
    if (!itemExistInVA) errors.push(`Paquete ${itemMO.value?.paquete} no existe en VA`)
  }

  for (const itemVA of arrayVA) {
    let itemExistInMO = false
    const keyToCheckVA = `${itemVA.value?.vehiculo}|${itemVA.value?.servicio}|${itemVA.value?.paquete}`
    console.log("VA: ", keyToCheckVA)
    for (const itemMO of arrayMO) {
      const keyToCheckMO = `${itemMO.value?.vehiculo}|${itemMO.value?.servicio}|${itemMO.value?.paquete}`
      console.log("MO: ", keyToCheckMO)
      if (keyToCheckVA === keyToCheckMO && !itemExistInMO) itemExistInMO = true
    }
    if (!itemExistInMO) errors.push(`Paquete ${itemVA.value?.paquete} no existe en VA`)
  }
  return errors
}
