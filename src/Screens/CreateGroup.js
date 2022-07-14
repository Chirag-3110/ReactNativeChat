import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import groupCss from '../Styles/CreateGroupCss';
import DocumentPicker from 'react-native-document-picker';
const CreateGroup = () => {
    const [image, setImage] = useState(null);
    const [grpName, setGrpName] = useState(null);
    const [grpDesc, setGrpDesc] = useState(null);
    const [clicked, setClicked] = useState(false)
    const addFile = async () => {
        try {
            const res = await DocumentPicker.pick({ type: [DocumentPicker.types.allFiles], });
            setImage(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    }
    return (
        <>
            <View style={groupCss.container}>
                <View style={groupCss.background} />
                <Text style={groupCss.title}>Create Group....</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={groupCss.inputText}>
                        <TextInput
                            placeholder='Group Name'
                            placeholderTextColor={"black"}
                            style={groupCss.input}
                            onChangeText={(name) => setGrpName(name)}
                        />
                    </View>
                    <TextInput
                        placeholder='Description'
                        placeholderTextColor={"black"}
                        style={groupCss.textarea}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={(desc) => setGrpDesc(desc)}
                    />
                    <View style={groupCss.imageButton} onChangeText={(image) => { setImage(image.uri), console.log(image) }}>
                        {image == null ? null : <Image
                            style={groupCss.iconStyle}
                            source={{ uri: image[0].uri }}

                        />}
                        <Text style={{ fontWeight: "bold", color: "black" }}>
                            {image == null ? "Select Image" : "Image Selected"}
                        </Text>
                        <TouchableOpacity onPress={addFile}>
                            <Image
                                style={groupCss.iconStyle}
                                source={require('../Assets/addphoto.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={groupCss.btnBody}
                >
                    {
                        clicked ?
                            <ActivityIndicator color={"blue"} size={30} /> :
                            <Text style={groupCss.btnText}>Create</Text>
                    }
                </TouchableOpacity>
            </View>
        </>
    );
};
export default CreateGroup;
