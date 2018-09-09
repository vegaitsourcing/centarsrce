import Immutable, { List } from "immutable";
import React from "react";
import { AsyncStorage, ScrollView, Text, TextInput, View } from "react-native";
import colors from "../../helpers/colors";
import questions from "./questions";
import styles from "./styles";

const InputLabel = ({ text }) => <Text style={styles.inputLabel}>{text}</Text>;

const Input = ({ value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Upiši ovde"
      placeholderTextColor={colors.grey}
      selectionColor={colors.darkPurple}
      underlineColorAndroid="transparent"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

export default class SafetyPlan extends React.Component {
  static navigationOptions = {
    title: "Moj sigurnosni plan"
  };

  constructor(props) {
    super(props);
    this.state = { questions: new List(questions.map(_ => "")) };
    AsyncStorage.getItem("safetyPlanState").then(safetyPlansState => {
      if (safetyPlansState) {
        this.setState({
          questions: Immutable.fromJS(JSON.parse(safetyPlansState))
        });
      }
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>
          Popuni upitnik i kreiraj svoj sigurnosni plan
        </Text>
        {questions.map((question, index) => (
          <View key={`question${index}`}>
            <InputLabel text={question} />
            <Input
              value={this.state.questions.get(index)}
              onChangeText={text => {
                this.setState(
                  {
                    questions: this.state.questions.set(index, text)
                  },
                  () =>
                    AsyncStorage.setItem(
                      "safetyPlanState",
                      JSON.stringify(this.state.questions.toJS())
                    )
                );
              }}
            />
          </View>
        ))}
      </ScrollView>
    );
  }
}