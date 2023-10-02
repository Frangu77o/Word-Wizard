import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';


export default function ModalLanguages({ label, isModalVisible, setModalVisible, setSelectedOption }){
    const languages = [
        'Chinese 🇨🇳',
        'Spanish 🇪🇸',
        'English 🇬🇧',
        'Hindi 🇮🇳',
        'Arabic 🇸🇦',
        'Bengali 🇧🇩',
        'Portuguese 🇵🇹',
        'Russian 🇷🇺',
        'Japanese 🇯🇵',
        'Punjabi 🇮🇳',
        'German 🇩🇪',
        'French 🇫🇷',
        'Javanese 🇮🇩',
        'Wu Chinese 🇨🇳',
        'Indonesian/Malay 🇮🇩',
        'Telugu 🇮🇳',
        'Vietnamese 🇻🇳',
        'Korean 🇰🇷',
        'Marathi 🇮🇳',
        'Italian 🇮🇹',
        'Other 🌏',
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setModalVisible(!isModalVisible);
    };
    return(
        <>
            <Text style={[styles.font, styles.label]}>Select {label} :</Text>
            <FlatList
                data={languages}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.button, {backgroundColor: "#0F0E0E"}]} onPress={()=>handleOptionSelect(item)}>
                        <Text style={[styles.font, {color: "white"}]}>{ item }</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
            />
            <TouchableOpacity style={styles.button} onPress={()=>setModalVisible(!isModalVisible)}>
                <Text style={styles.font}>CLOSE</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
      padding: "3%",
      backgroundColor: "#D9D9D9",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "5%"
    },
    font: {
      fontSize: 17,
      fontWeight: "bold"
    },
    label: {
        color: "white",
        padding: "2%",
        marginBottom: "10%"
    }
});