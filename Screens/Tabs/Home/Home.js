import {Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";

import {Ionicons} from "@expo/vector-icons";
import {useForm} from "react-hook-form";
import Input from "../../../components/UI/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect} from "react";
import {isFirstLaunch} from "../../../utils/isFirstLaunch";
import Slider from "./Slider";
import {Title} from "../../../components/UI/Title";
import {useDoubleBackHandler} from "../../../hooks/useDoubleBackHandler";


const inputStyle = 'p-4 m-4 shadow-sm  rounded-xl bg-white flex flex-row overflow-hidden';

export const Home = ({navigation}) => {

    useDoubleBackHandler();
    useEffect(() => {

        (async () => {
            const firstLaunch = await isFirstLaunch();
            console.log("FirstLaunch: ",firstLaunch)
            if (firstLaunch) {
                navigation.navigate('WelcomeScreen')
            }
        })();

            }, [navigation]);


    // const backAction = () => {
    //     const doubleClickInterval = 1000;
    //     if (this.lastBackPressed && this.lastBackPressed + doubleClickInterval >= Date.now()) {
    //         BackHandler.exitApp();
    //         return true;
    //     }
    //     this.lastBackPressed = Date.now();
    //     ToastAndroid.show('Нажмите еще раз чтобы выйти', ToastAndroid.SHORT);
    //     return true;
    // };


    const {
        control, handleSubmit,
        formState: {errors}
    } = useForm({defaultValues: {title: null}});
    const getFields = (data) => {
        console.log(data)
    }

    return (
        <ScrollView className={`h-full p-2 bg-white`}>

            <Slider/>
            <View className={`p-4 bg-[#0ED250] rounded-lg mb-2`}>
                <View>
                    {/* Menu Item 1 */}
                    <TouchableOpacity className={`p-3 m-1 bg-white rounded-lg justify-center items-center`}>
                        <Text>Категории</Text>
                    </TouchableOpacity>

                    {/* Menu Item 2 */}
                    <TouchableOpacity className={`p-3 m-1 bg-white rounded-lg justify-center items-center`}>
                        <Text>История</Text>
                    </TouchableOpacity>

                    {/* Menu Item 3 */}
                    <TouchableOpacity className={`p-3 m-1 bg-white rounded-lg justify-center items-center`}>
                        <Text>Отслеживания</Text>
                    </TouchableOpacity>

                    {/* Menu Item 4 */}
                    <TouchableOpacity className={`p-3 m-1 bg-white rounded-lg justify-center items-center`}>
                        <Text>Заявки</Text>
                    </TouchableOpacity>

                    {/* Menu Item 5 */}
                    <TouchableOpacity className={`p-3 m-1 bg-white rounded-lg justify-center items-center`}
                                      onPress={() => {
                                          navigation.navigate('Filter', {id: true})
                                      }}>
                        <Text>Добавить пост</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Title><Text>Последние Новости</Text></Title>
            <View className={`${inputStyle} focus:shadow-lg shadow-black `}>
                <Ionicons name="document-text-outline" size={23} color={'rgba(0,0,0,0.3)'}/>
                <Input control={control} errors={errors} name={'title'} placeholder={"Title"} rules={{required: true}}/>
            </View>

            <Pressable className={'items-center bg-green-800 p-3 m-3'} onPress={handleSubmit(getFields)}>
                <Text className={'text-white '}>Create Post</Text>
            </Pressable>
            <Pressable className={'items-center bg-green-800 p-3 m-3'} onPress={ async () => {
                handleSubmit(getFields)
                await AsyncStorage.removeItem('first_launch').then(() => {
                    console.log("removed!")
                })
            }}>
                <Text className={'text-white '} >RemoveKey</Text>
            </Pressable>
        </ScrollView>

    )

}
