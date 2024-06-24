import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import usePosts from '../../hooks/usePost'; // Ensure the correct path to the hook

export default function HomeScreen() {
  const { posts, isLoading, error } = usePosts();
  const router = useRouter();

  if (isLoading) {
    return (
      <SafeAreaView className='bg-white h-full px-3 pt-3'>
        <Text className='text-center text-lg'>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    console.log(error);
    return (
      <SafeAreaView className='bg-white h-full px-3 pt-3'>
        <Text className='text-center text-lg text-red-500'>Error loading posts</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='bg-white h-full px-3 pt-3'>
      <FlatList
        data={posts}
        ListEmptyComponent={() => (
          <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
            <Image
              source={require('../../assets/images/no-data.png')}
              style={{ width: 200, height: 200 }}
              className='rounded-lg'
            />
            <Text className='text-lg text-gray-700 pt-3'>You haven't created any posts</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className='p-3 rounded-lg mb-3 border border-gray-200 shadow-sm'>
            <Text className='text-lg font-semibold'>{item.title}</Text>
            <Text className='text-base text-gray-500 mb-3'>{item.body}</Text>
            <CustomButton
              handlePress={() => router.push(`/post/${item.id}`)}
              title='View'
              containerStyles='mt-3'
              variant='outline'
              titleStyles='text-base'
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='mb-6'>
            <Text className='text-xl text-gray-800 font-rubiksemibold'>Welcome</Text>
            <Text className='text-gray-500 text-base'>Here are the Posts you have created</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
