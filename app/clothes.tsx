import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Alert, TextInput, FlatList } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export default function ClothesSection() {
  // State for like button
  const [liked, setLiked] = useState(false);

  // States for comments
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleOrder = async () => {
    try {
      await Linking.openURL('https://wa.me/+2348086615774'); // Replace with actual WhatsApp link
    } catch (error) {
      Alert.alert('Error', 'Failed to open the link. Please try again later.');
    }
  };

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleAddComment = () => {
    if (comment.trim() === '') {
      Alert.alert('Error', 'Comment cannot be empty!');
      return;
    }
    setComments((prevComments) => [...prevComments, { id: Date.now().toString(), text: comment }]);
    setComment('');
  };

  return (
    <View style={styles.container}>
      {/* Product Image */}
      <Image
        source={{ uri: 'https://via.placeholder.com/300x200' }} // Replace with actual image URI
        style={styles.productImage}
      />

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>VINTAGE SHIRTS</Text>
        <Text style={styles.productPrice}>N 15,999</Text>
      </View>

      {/* Like Button */}
      <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
        <AntDesign
          name={liked ? 'heart' : 'hearto'}
          size={24}
          color={liked ? 'red' : '#fff'}
        />
      </TouchableOpacity>

      {/* Description Box */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.descriptionText}>
          Premium Quality Shirt{'\n'}
          {'\n'}- Soft, breathable fabric{'\n'}- Relaxed fit{'\n'}- Vibrant Blue
          color{'\n'}- Unisex design{'\n'}
          {'\n'}Size: XL{'\n'}Material: Cotton{'\n'}
          {'\n'}Contact info: +23412345678934
        </Text>
      </View>

      {/* Order Button and Icon */}
      <View style={styles.orderContainer}>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderText}>ORDER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderIcon} onPress={handleOrder}>
          <MaterialIcons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Comment Box */}
      <View style={styles.commentBox}>
        <Text style={styles.commentTitle}>Comments:</Text>
        {/* Input Field */}
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#aaa"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
          <Text style={styles.addCommentText}>Post</Text>
        </TouchableOpacity>

        {/* Display Comments */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ddd',
  },
  likeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#444',
    borderRadius: 50,
    padding: 10,
  },
  descriptionContainer: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ddd',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderButton: {
    flex: 1,
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  orderText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  orderIcon: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
  },
  commentBox: {
    marginTop: 20,
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  commentInput: {
    backgroundColor: '#444',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  addCommentButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  addCommentText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  comment: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  commentText: {
    color: '#fff',
    fontSize: 14,
  },
});
