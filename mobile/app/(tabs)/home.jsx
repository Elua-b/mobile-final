import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import useAuth from '../../hooks/useAuth';
import useProducts from '../../hooks/useProducts';

export default function HomeScreen() {
  const { user } = useAuth();
  const { products } = useProducts();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  return (
    <SafeAreaView className='bg-white h-full px-3 pt-3'>
      <View className='mb-6 flex justify-center items-center'>
        <Text className='text-xl text-gray-800 font-rubiksemibold'>
          Welcome, <Text className='mr-4 text-slate-900'>{user?.name}</Text>
        </Text>
        <Text className='text-gray-500 text-base'>Here are the created products</Text>
      </View>

      <View className="p-4">
        <TextInput
          placeholder='Search products'
          className='border-gray-500 border-2 p-4 rounded-md'
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <FlatList
        data={filteredProducts}
        ListEmptyComponent={() => (
          <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
            {searchQuery ? (
              <Text className='text-lg text-gray-700 pt-3'>No products found</Text>
            ) : (
              <>
                <Image
                  source={require('../../assets/images/no-data.png')}
                  style={{ width: 200, height: 200 }}
                  className='rounded-lg'
                />
                <Text className='text-lg text-gray-700 pt-3'>You haven't created any products</Text>
              </>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='p-3 rounded-lg mb-3 border border-gray-200 bg-slate-900 shadow-sm'>
            <Text className='text-lg font-semibold text-white'>{item.name}</Text>
            <Text className='text-base text-gray-500 mb-3'>{item.description}</Text>
            <Text className='text-base text-b-800'>${item.price}</Text>
            <CustomButton
              handlePress={() => router.push(`/product/${item.id}`)}
              title='View'
              containerStyles='mt-3'
              variant='outline'
              titleStyles='text-base'
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
