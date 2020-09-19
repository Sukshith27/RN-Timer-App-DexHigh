import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import useInterval from 'react-useinterval';

export default function Timer() {

    function useInterval(callback, delay) {
        const savedCallback = useRef();
        const intervalId = useRef(null);
        const [currentDelay, setDelay] = useState(delay);

        const toggleRunning = useCallback(
            () => setDelay(currentDelay => (currentDelay === null ? delay : null)),
            [delay]
        );

        const clear = useCallback(() => clearInterval(intervalId.current), []);

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (intervalId.current) clear();

            if (currentDelay !== null) {
                intervalId.current = setInterval(tick, currentDelay);
            }

            return clear;
        }, [currentDelay, clear]);

        return [toggleRunning, !!currentDelay];
    }

    const [count, setCount] = useState(0);

    const [toggle, running] = useInterval(() => {
        setCount(count => count + 1);
    }, 1000);

    const resetCounter = () => setCount(0);

    return (
        <View style={styles.container}>
            <Text style={styles.secondText}>{count}</Text>
            <View style={styles.buttonWrapper}>
                <Button title="Reset" onPress={resetCounter} />
                <Button title={running ? "Pause" : "Resume"} onPress={toggle} />
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    secondText: {
        fontSize: 25
    }
})