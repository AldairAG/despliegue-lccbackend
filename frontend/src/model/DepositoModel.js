class DepositoModel {
    constructor(userName, firebaseKey, cantidad,date,concepto,hora,emisor) {
        this.userName = userName;
        this.firebaseKey = firebaseKey;
        this.cantidad = cantidad;
        this.date=date
        this.concepto=concepto
        this.hora=hora
        this.emisor=emisor
    }
    setDefaultValues() {
        this.userName = "";
        this.firebaseKey = "";
        this.cantidad = 0;
        this.date="";
        this.concepto="";
        this.hora=""
        this.emisor=""
    }

}
export default DepositoModel