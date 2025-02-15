import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const plans = [
  {
    id: "1",
    title: "Basic Plan",
    priceMonthly: "₦0.00",
    priceYearly: "₦0.00",
    benefits: ["Limited Access", "No Priority Support"],
    gradient: ["#DCE6FF", "#F5F5F5"],
  },
  {
    id: "2",
    title: "Standard Plan",
    priceMonthly: "₦1,500",
    priceYearly: "₦15,000",
    benefits: [
      "Access to All Features",
      "Priority Support",
      "Monthly Subscription",
    ],
    gradient: ["#6D83FF", "#88A7FF"],
  },
  {
    id: "3",
    title: "Premium Plan",
    priceMonthly: "₦3,000",
    priceYearly: "₦30,000",
    benefits: [
      "Access to Premium Features",
      "Priority Support",
      "Monthly & Yearly Subscriptions",
      "Exclusive Perks",
    ],
    gradient: ["#FFD700", "#FFA500"],
  },
];

const SubscriptionPlan = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or yearly
  const router = useRouter();

  const renderPlanCard = ({ item }) => (
    <LinearGradient
      colors={item.gradient}
      style={styles.planCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.planTitle}>{item.title}</Text>
      <Text style={styles.planPrice}>
        {billingCycle === "monthly" ? item.priceMonthly : item.priceYearly}{" "}
        <Text style={styles.billingCycle}>
          {billingCycle === "monthly" ? "/month" : "/year"}
        </Text>
      </Text>
      <View style={styles.benefitsContainer}>
        {item.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <FontAwesome name="check-circle" size={18} color="#4CAF50" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.subscribeButton}
        onPress={() =>
          router.push({
            pathname: "../paymentoption",
            params: {
              planTitle: item.title,
              planPrice: billingCycle === "monthly" ? item.priceMonthly : item.priceYearly,
            },
          })
        }
      >
        <Text style={styles.subscribeButtonText}>Choose Plan</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Choose Your Plan</Text>
        <Text style={styles.subHeaderText}>
          Select a subscription plan that works best for you.
        </Text>
      </View>

      {/* Billing Cycle Toggle */}
      <View style={styles.billingToggle}>
        <TouchableOpacity
          style={[
            styles.billingOption,
            billingCycle === "monthly" && styles.selectedOption,
          ]}
          onPress={() => setBillingCycle("monthly")}
        >
          <Text
            style={[
              styles.billingOptionText,
              billingCycle === "monthly" && styles.selectedText,
            ]}
          >
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.billingOption,
            billingCycle === "yearly" && styles.selectedOption,
          ]}
          onPress={() => setBillingCycle("yearly")}
        >
          <Text
            style={[
              styles.billingOptionText,
              billingCycle === "yearly" && styles.selectedText,
            ]}
          >
            Yearly
          </Text>
        </TouchableOpacity>
      </View>

      {/* Subscription Plans */}
      <FlatList
        data={plans}
        renderItem={renderPlanCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.planList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6D83FF",
  },
  subHeaderText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  billingToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  billingOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: "#6D83FF",
  },
  billingOptionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedText: {
    color: "#FFF",
  },
  planList: {
    paddingBottom: 20,
  },
  planCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6D83FF",
  },
  billingCycle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#999",
  },
  benefitsContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#555",
  },
  subscribeButton: {
    backgroundColor: "#6D83FF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default SubscriptionPlan;
