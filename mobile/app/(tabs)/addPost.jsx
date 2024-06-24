import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { useRouter } from 'expo-router';
import usePosts from '../../hooks/usePost';
import { validtePost } from '../../lib/utils';


const AddPost = () => {
  const { createPost, creatingPost } = usePosts();
  const toast = useToast();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(1); // Assuming the userId is 1 for simplicity

  const handleSubmit = async () => {
    


    if (!title || !body) {
      toast.show("Please fill in all fields", { type: 'warning' });
      return;
    }
    const validateResults=validtePost({title, body})
    if(!validateResults.title.valid){
        return toast.show(validateResults.message,{type:'danger'})
    }
    if(!validateResults.body.valid){
        return toast.show(validateResults.message,{type:'danger'})
    }


    const newPost = { title, body, userId };
    await createPost(newPost, true);
  };

  return (
    <View className='flex-1 p-4 bg-white'>
      <Text className='text-2xl font-bold mb-6'>Add New Post</Text>
      <TextInput
        className='h-10 border border-gray-300 mb-4 px-2'
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className='h-40 border border-gray-300 mb-4 px-2'
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button title={creatingPost ? "Creating..." : "Add Post"} onPress={handleSubmit} disabled={creatingPost} />
    </View>
  );
}

export default AddPost;
