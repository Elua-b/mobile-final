import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import usePosts from '../../hooks/usePost';
import Ioicons from '@expo/vector-icons/Ionicons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

const PostView = () => {
  const toast = useToast();
  const pathname = usePathname();
  const { posts, updatePost, updatingPost, deletePost, deletingPost, fetchComments } = usePosts();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  useEffect(() => {
    if (pathname) {
      const id = pathname.split('/')[2];
      const post = posts?.find((p) => p.id === parseInt(id));
      if (post) {
        setPost(post);
        setFormData({
          title: post.title,
          body: post.body
        });
      }
      fetchComments(id).then(setComments);
    }
  }, [pathname]);

  const handleSubmit = () => {
    if (!formData.title || !formData.body) {
      return toast.show("Please fill in all fields", {
        type: 'danger'
      });
    }
    // check if something changed
    if (formData.title === post?.title && formData.body === post?.body) {
      return toast.show("No changes detected", {
        type: 'info'
      });
    }
    updatePost({
      ...formData,
      id: post?.id
    }, true);
  };

  if (!post) return null;

  return (
    <SafeAreaView className='bg-slate-900 h-full p-3'>
        <ScrollView>

      <View className='flex-row justify-between' >
        <TouchableOpacity
          onPress={() => router.push('/home')}
          className='flex-row bg-white items-center h-fit rounded-md p-3 justify-between space-x-3'>
          <Ioicons name='arrow-back' size={24} />
          <Text className="">Back to posts</Text>
        </TouchableOpacity>
        <CustomButton
          isLoading={deletingPost}
          handlePress={() => deletePost(post.id, true)}
          title='Delete'
          variant='outline'
          titleStyles='text-red-500'
          containerStyles='border-red-500 w-32 py-1'
          />
      </View >
      <View className='mt-6'>
        <Text className='text-xl  text-center font-rubiksemibold text-white p-4'>Post Details</Text>
        <View className='mb-5 mt-4 p-7'>
          <CustomInput
            value={formData.title}
            label='Post Title'
            placeholder='Enter post title'
            onChangeText={(val) => setFormData({ ...formData, title: val })}
            />
          <CustomInput
            value={formData.body}
            label='Body'
            placeholder='Enter post body'
            onChangeText={(val) => setFormData({ ...formData, body: val })}
            multiline
            numberOfLines={4}
            containerStyles='mt-3'
            />
        </View>
        {/* <CustomButton
          isLoading={updatingPost}
          title='Update Post'
          handlePress={handleSubmit}
          containerStyles='mt-8'
          /> */}
      </View>
      <View className='mt-6 bg-white rounded-md'>
        <Text className='text-xl text-center font-rubiksemibold text-slate-500  p-4'>Comments</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
              <View className='p-3 rounded-lg mb-3 border border-gray-200 shadow-sm'>
              <Text className='text-lg font-semibold'>{item.name}</Text>
              <Text className='text-base text-gray-500 mb-3'>{item.body}</Text>
              <Text className='text-sm text-gray-400'>{item.email}</Text>
            </View>
          )}
          ListEmptyComponent={() => (
              <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
              <Text className='text-lg text-gray-700 pt-3 '>No comments found</Text>
            </View>
          )}
          />
      </View>
          </ScrollView>
    </SafeAreaView>
  );
};

export default PostView;