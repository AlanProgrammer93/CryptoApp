import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { socket } from '../App';

const cryptoListHard = [
	{
		id: '1',
		name: 'BTC',
		price: 38001.64,
	},
	{
		id: '2',
		name: 'ETH',
		price: 4025.0,
	},
	{
		id: '3',
		name: 'SOL',
		price: 250.21,
	},
];

const Home = ({ navigation }) => {
	const [cryptoList, setCryptoList] = useState();

	useEffect(() => {
		socket.on('crypto', data => {
			setCryptoList(data);
		});
	}, []);

	const openCryptoDetail = (id) => {
		navigation.navigate('Detail', { id });
	};

	const renderItem = ({ item }) => {
		return (
			<Pressable
				style={styles.crypto}
				onPress={() => openCryptoDetail(item.id)}>
				<Text style={styles.name}>{item.name}</Text>
				<Text style={styles.price}>{Math.round(item.price * 1000) / 1000}</Text>
			</Pressable>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={cryptoList}
				renderItem={renderItem}
				keyExtractor={item => item.id}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#272d42',
		flex: 1,
	},
	crypto: {
		borderRadius: 5,
		borderWidth: 1,
		backgroundColor: '#000',
		padding: 20,
		flex: 1,
		margin: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	name: {
		color: '#fff',
		fontSize: 24,
	},

	price: {
		color: '#ffab00',
		fontSize: 28,
	},
});

export default Home