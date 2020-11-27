import React, { useState } from 'react';
import {
  View,  Text,  StyleSheet,  TouchableOpacity,  TextInput,  Modal,  FlatList,} from 'react-native';

const App = () => {

  const [old_price, setold_price] = useState("");
  const [discount_price, setdiscount_price] = useState("");
  const [total_discount, settotal_discount] = useState("0");
  const [Price_disc, setPrice_disc] = useState("0");

  const [calError, setCalError] = useState("");

  const [history, setHistory] = useState([""]);
  const [modalVisible, setModalVisible] = useState(false);


  calculateDiscount = () => {
    if (discount_price <= 100 && old_price >= 0 && discount_price >= 0) {
      var saved = (old_price * discount_price) / 100;
      var final_Price = old_price - saved;
      settotal_discount(saved.toFixed(2));
      setPrice_disc(final_Price.toFixed(2));
      setCalError("")
    } else if (discount_price > 100) {
      setCalError("Discount Cannot be greater than 100%");
    } else if (old_price < 0 || discount_price < 0) {
      setCalError("Price or Discount% must be greater than 0");
    }
  }

  saveResult = () => {
    var dash = " | ";
    var result = "\nOld Price was Rs: " + old_price + "\nDicount percent was " + discount_price + "% " + "\nDicounted Price was " + "Rs: " + Price_disc;
    console.log(result);
    setHistory(oldHistory => [...history, result]);

    setold_price("");
    setdiscount_price("");
  }

  viewHistory = () => {
    setModalVisible(true);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>

      </View>
      <View style={styles.mainView}>
        <TextInput keyboardType={"number-pad"} value={old_price} onChangeText={(orgPrice) => setold_price(orgPrice)} style={styles.textFields} placeholder={"Price"} />
        <View style={{ paddingTop: 10 }} />
        <TextInput keyboardType={"number-pad"} value={discount_price} onChangeText={(discountPercentage) => setdiscount_price(discountPercentage)} style={styles.textFields} placeholder={"Discount Percent"} />
        <View style={{ paddingTop: 20 }} />
        <TouchableOpacity onPress={() => calculateDiscount()} style={styles.calcBtn}>
          <Text style={styles.calcBtnText}>Calculate</Text>
        </TouchableOpacity>
        <View style={{ paddingTop: 10 }} />
        <Text style={{ fontSize: 15, color: 'red' }}>{calError}</Text>
        <View style={{ paddingTop: 10 }} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.resultText}>Discounted Price :</Text>
          <Text style={styles.finalPriceText}> Rs {Price_disc}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.resultText}>Total Discount :</Text>
          <Text style={[styles.finalPriceText, { color: 'black' }]}> Rs {total_discount}</Text>
        </View>
        <View style={{ paddingTop: 15 }} />
        <TouchableOpacity onPress={() => saveResult()} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
        <View style={{ paddingTop: 10 }} />
        <TouchableOpacity onPress={() => viewHistory()} style={styles.historyBtn}>
          <Text style={styles.historyBtnText}>View History</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeading}>History</Text>
              <Text style={styles.firstIndexHistoryText}>Price</Text>
              <Text style={styles.firstIndexHistoryText}>Discount%</Text>
              <Text style={styles.firstIndexHistoryText}>Final Price</Text>
              <FlatList

                data={history}
                renderItem={({ item }) => { return <Text style={styles.listTextItem}>{item}</Text> }}
                keyExtractor={(index) => { return index }} />

              <TouchableOpacity
                style={{ ...styles.closeHistory, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeHistory: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    width: 100,
    height: 30,
    elevation: 2,
    justifyContent: 'center'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalHeading: {
    fontSize: 20,
    paddingBottom: 10
  },
  firstIndexHistoryText: {
    fontSize: 18,
  },

  headerText: {
    fontSize: 24,
    color: 'white'
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  textFields: {
    height: 50,
    width: 280,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 18,
    borderRadius: 10,
  },
  calcBtn: {
    height: 40,
    width: 200,
    backgroundColor: '#359c52',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  calcBtnText: {
    fontSize: 24,
    color: 'white'
  },
  resultText: {
    fontSize: 20,
  },
  finalPriceText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  saveBtn: {
    height: 35,
    width: 150,
    backgroundColor: '#388E3C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  saveBtnText: {
    fontSize: 18,
    color: 'white'
  },
  historyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyBtnText: {
    fontSize: 18,
    color: '#566573'
  },
  listTextItem: {
    fontSize: 18
  }
});

export default App;