import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {PureComponent} from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    content: PropTypes.array,
};

class List extends PureComponent {
    render() {
        const {title, content, navigation} = this.props;
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <View>
                    <FlatList
                        data={content}
                        renderItem={({item}) => (
                            <Card item={item} navigation={navigation} />
                        )}
                        horizontal={true}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    list: {
        marginTop: 20,
        marginHorizontal: 5,
    },
});

List.propTypes = propTypes;

export default List;
