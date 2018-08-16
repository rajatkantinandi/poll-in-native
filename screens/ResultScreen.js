import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VictoryPie, VictoryTheme, VictoryLegend } from "victory-native";
import { ColorMode } from "../constants/Colors";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Result: "
  };

  render() {
    const Colors = ColorMode.getColor();
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors.lightbg
      },
      heading: {
        padding: 5,
        fontSize: 18,
        color: Colors.impTxt
      },
      heading2: {
        paddingLeft: 8,
        color: Colors.secondaryTxt
      }
    });
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
            marginTop: 10
          }}
        >
          <VictoryPie
            data={data}
            colorScale="qualitative"
            radius={120}
            theme={VictoryTheme.material}
            style={{
              labels: {
                fill: "#fff",
                fontWeight: "bold",
                fontSize: 13
              }
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
            style={{
              labels: {
                fill: Colors.primaryText,
                fontWeight: "bold",
                fontSize: 13
              }
            }}
            padding={15}
          />
        </View>
      </View>
    );
  }
}
