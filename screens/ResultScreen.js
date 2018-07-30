import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VictoryPie, VictoryTheme, VictoryLegend } from "victory-native";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Result: "
  };

  render() {
    const totalvotes = this.props.navigation.getParam("totalvotes");
    const data = this.props.navigation.getParam("options").map(elem => {
      const x = elem.value;
      const y = Math.round((100 * elem.votes) / totalvotes);
      return { x, y };
    });
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          {this.props.navigation.getParam("question")}
        </Text>
        <Text style={styles.heading2}>Total Votes: {totalvotes}</Text>
        <View
          style={{
            flex: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
          }}
        >
          <VictoryPie
            data={data}
            colorScale="qualitative"
            radius={120}
            theme={VictoryTheme.material}
            style={{
              labels: { fill: "#fff", fontWeight: "bold", fontSize: 17 }
            }}
            labelRadius={80}
            labels={d => d.y + "%"}
            height={240}
            width={240}
          />
          <VictoryLegend
            orientation="vertical"
            gutter={10}
            colorScale="qualitative"
            data={data.map(elem => ({
              name: elem.x
            }))}
            padding={30}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 30,
    color: "maroon"
  },
  heading2: {
    fontSize: 20,
    color: "grey"
  }
});
