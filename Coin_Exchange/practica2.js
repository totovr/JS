// function coin() {
var coin = function() {

    this.name
    this.typeOfChange
    this.message = [
      "There are no dollars to exchange",
      "The amount is to high for this application",
      "13 is a bad luck number, please try another number"
    ]

    this.change = function(mount) {
        changeResult = mount * this.typeOfChange
        var messageHTML
        if (mount <= 0) {
          messageHTML = this.message[0]
        } else if (mount == 13) {
          messageHTML = this.message[2]
        } else if (mount > 1000) {
          messageHTML = this.message[1]
        } else {
          messageHTML = "The amount of dollars to exchange is " + mount + " and the exchange rate in Yen is " + changeResult
        }
        document.getElementById('resultOfTheExchange').innerHTML = messageHTML
    }
}

var yen = new coin()
    yen.name = "Yens"
    yen.typeOfChange = 111.44

var euro = new coin()
    euro.name = "Euro"
    euro.typeOfChange = 129.70

function changeCoin(typeOfCoin) {
    var selectedAmount = document.getElementById('dollars').value

    if(typeOfCoin == "yen") {
        yen.change(selectedAmount)
    }else if (typeOfCoin == "euro") {
        euro.change(selectedAmount)
    }

}
