import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Linking, 
  Alert, 
  TextInput, 
  FlatList, 
  ActivityIndicator, 
  Share 
} from 'react-native';
import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

export default function ShoppingScreen() {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data from the MySQL database (replace with your API endpoint)
    axios.get('http://your-server.com/api/products/1')
      .then(response => {
        setProductData(response.data);
        setLoading(false);
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to load product data.');
        setLoading(false);
      });
  }, []);

  const handleOrder = async () => {
    try {
      await Linking.openURL(`https://wa.me/${productData?.contact}`);
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

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing product: ${productData?.title}\nPrice: ${productData?.price}\nDetails: ${productData?.description}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share the product.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
        <Text style={styles.loaderText}>Loading product details...</Text>
      </View>
    );
  }

  if (!productData) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>No product data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Product Image */}
      <Image
        source={{ uri: productData.image }}
        style={styles.productImage}
      />

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{productData.title}</Text>
        <Text style={styles.productPrice}>N {productData.price}</Text>
      </View>

      {/* Like and Share Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
          <AntDesign
            name={liked ? 'heart' : 'hearto'}
            size={24}
            color={liked ? 'red' : '#fff'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <FontAwesome name="share-alt" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Description Box */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.descriptionText}>{productData.description}</Text>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  loaderText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  likeButton: {
    backgroundColor: '#444',
    borderRadius: 50,
    padding: 10,
  },
  shareButton: {
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
