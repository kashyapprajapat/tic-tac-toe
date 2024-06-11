/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import icons from './components/icons';


function App(): React.JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<String>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = () => {
    const winningCombinations = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (gameState[a] !== 'empty' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        setGameWinner(gameState[a] === 'cross' ? 'Cross wins!' : 'Circle wins!');
        return;
      }
    }

    // Check for a draw
    if (!gameState.includes('empty')) {
      setGameWinner('Draw!');
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: `${gameWinner}`,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
      });
    }

    if(gameState[itemNumber] === 'empty'){
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    }else{
      return Snackbar.show({
        text:"Position is Already Field",
        backgroundColor:"red",
        textColor: "#FFF",
      });
    }
   checkIsWinner();
  };

  const renderIcon = (item: String) => {
    return icons({ name: `${item}` });
  };

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar />
    <View style={styles.header}>
      <Text style={styles.title}>Tic Tac Toe</Text>
    </View>
    <View style={styles.board}>
      {gameState.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tile}
          onPress={() => onChangeItem(index)}
        >
          {renderIcon(item)}
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.footer}>
      {gameWinner ? (
        <Text style={styles.winnerText}>{gameWinner}</Text>
      ) : (
        <Text style={styles.turnText}>{isCross ? 'Cross' : 'Circle'}'s turn</Text>
      )}
      <TouchableOpacity style={styles.reloadButton} onPress={reloadGame}>
        <Text style={styles.reloadText}>Reload Game</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    alignSelf: 'center',
  },
  tile: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  turnText: {
    fontSize: 20,
    marginBottom: 10,
  },
  reloadButton: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  reloadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
