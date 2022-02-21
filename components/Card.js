import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const placeholderImage = require('../assets/images/placeholder.png');

const propTypes = {
    item: PropTypes.object,
};

class Card extends Component {
    render() {
        const {item, navigation} = this.props;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() =>
                    navigation.navigate('Detail', {movieId: item.id})
                }>
                <Image
                    style={styles.image}
                    source={
                        item.poster_path
                            ? {
                                  uri:
                                      'https://image.tmdb.org/t/p/original' +
                                      item.poster_path,
                              }
                            : placeholderImage
                    }
                />

                {!item.poster_path && (
                    <Text style={styles.movieName}>{item.title}</Text>
                )}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: 'relative',
        alignItems: 'center',
        height: 200,
    },
    image: {
        height: 200,
        width: 120,
        borderRadius: 10,
    },
    movieName: {
        position: 'absolute',
        width: 100,
        textAlign: 'center',
        top: 10,
    },
});

Card.propTypes = propTypes;

export default Card;
