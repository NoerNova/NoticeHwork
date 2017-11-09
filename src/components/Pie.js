import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, StatusBar, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        margin: 10
    }
});

class Pie extends Component {
    render() {
        const chart_wh = 250
        const series = [40, 60]
        const sliceColor = ['#F44336', '#2196F3']

        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <StatusBar
                        hidden={true}
                    />
                    <Text style={styles.title}>Doughnut</Text>
                    <PieChart
                        chart_wh={chart_wh}
                        series={series}
                        sliceColor={sliceColor}
                        doughnut={true}
                        coverRadius={0.45}
                        coverFill={'#FFF'}
                    />
                </View>
            </ScrollView>
        );
    }
}

export default Pie;
