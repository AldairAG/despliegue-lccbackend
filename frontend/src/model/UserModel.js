
class UserModel {
  constructor(userName, lastName, firstName, email, password, referredBy, country, phoneNumber, validity, rank,
    admissionDate, usdtAddress, firebaseKey, rol,
    walletDiv, walletCom, bonoRefDirect, bonoFastTrack, bonoIgualacion, bonoIgualacionSem, bonoIngresoRes, bonoRangoRes,
    firtsAdd, activo, request, userPermisos, staterPack, retiros, intComp, walletTotal) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.phoneNumber = phoneNumber;
    this.admissionDate = admissionDate;
    this.firebaseKey = firebaseKey;
    this.rol = rol;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.referredBy = referredBy;
    this.validity = validity
    this.usdtAddress = usdtAddress;
    this.rank = rank;
    this.request = request
    this.retiros = retiros

    this.walletDiv = walletDiv
    this.walletCom = walletCom
    this.bonoRefDirect = bonoRefDirect
    this.bonoFastTrack = bonoFastTrack
    this.bonoIgualacion = bonoIgualacion
    this.bonoIgualacionSem = bonoIgualacionSem
    this.bonoIngresoRes = bonoIngresoRes
    this.bonoRangoRes = bonoRangoRes
    this.firtsAdd = firtsAdd
    this.activo = activo
    this.staterPack = staterPack
    this.intComp = intComp
    this.walletTotal = walletTotal
  }

  setDefaultValues() {
    this.userName = "";
    this.lastName = "";
    this.firstName = "";
    this.email = "";
    this.password = "";
    this.referredBy = "";
    this.rank = 0;
    this.country = "";
    this.phoneNumber = "";
    this.usdtAddress = "";
    this.admissionDate = "";
    this.firebaseKey = "";
    this.rol = "u";
    this.validity = ""
    this.request = 0
    this.permisos = {
      matchingBono: true
    }

    this.walletDiv = 0
    this.walletCom = 0
    this.bonoRefDirect = 0
    this.bonoFastTrack = 0
    this.bonoIgualacion = 0
    this.bonoIgualacionSem = 0
    this.bonoIngresoRes = 0
    this.bonoRangoRes = 0
    this.firtsAdd = 0
    this.activo = false
    this.staterPack = 0
    this.retiros = 0
    this.intComp = "00"
    this.walletTotal = 0
  }

}
export default UserModel
