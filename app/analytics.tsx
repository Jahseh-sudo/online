import React from "react";
import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function SellerAnalytics() {
  // Sample data
  const productViewsData = {
    labels: ["Product A", "Product B", "Product C", "Product D"],
    datasets: [
      {
        data: [120, 85, 60, 30], // Views per product
      },
    ],
  };

  const productLikesData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        data: [10, 20, 15, 30], // Likes over time
      },
    ],
  };

  const productsPieData = [
    { name: "Sold", population: 40, color: "#4CAF50", legendFontColor: "#333", legendFontSize: 14 },
    { name: "Unsold", population: 60, color: "#F44336", legendFontColor: "#333", legendFontSize: 14 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Seller Analytics</Text>

      {/* Bar Chart for Product Views */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Product Views</Text>
        <BarChart
          data={productViewsData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
      </View>

      {/* Line Chart for Product Likes */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Product Likes Over Time</Text>
        <LineChart
          data={productLikesData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chartStyle}
        />
      </View>

      {/* Pie Chart for Products Sold vs Unsold */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Products Sold vs Unsold</Text>
        <PieChart
          data={productsPieData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: "#1C1C1E",
  backgroundGradientFrom: "#f7f7f7",
  backgroundGradientTo: "#e9e9e9",
  decimalPlaces: 0, // For removing decimals
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 24,
    textAlign: "center",
  },
  chartContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginBottom: 12,
  },
  chartStyle: {
    borderRadius: 8,
  },
});
