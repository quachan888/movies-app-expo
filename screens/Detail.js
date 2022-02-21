import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Modal,
    Pressable
} from 'react-native';
import dateFormat from 'dateformat';
import { getMovieDetail } from '../services/services';
import StarRating from 'react-native-star-rating';
import PlayButton from '../components/PlayButton';

const placeholderImage = require('../assets/images/placeholder.png');
const dimensions = Dimensions.get('screen');

const Detail = ({ route, navigation }) => {
    const movieId = route.params.movieId;

    const [movieDetail, setMovieDetail] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getMovieDetail(movieId).then((movieData) => {
            setMovieDetail(movieData);
            setLoaded(true);
        });
    }, [movieId]);

    const videoShown = () => setModalVisible(!modalVisible);

    return (
        <>
            {loaded ? (
                <View>
                    <ScrollView>
                        <Image
                            resizeMode="cover"
                            style={styles.image}
                            source={
                                movieDetail.poster_path
                                    ? {
                                          uri:
                                              'https://image.tmdb.org/t/p/original' +
                                              movieDetail.backdrop_path
                                      }
                                    : placeholderImage
                            }
                        />

                        <View style={styles.container}>
                            <View style={styles.playButton}>
                                <PlayButton handlePress={videoShown} />
                            </View>
                            <Text style={styles.title}>
                                {movieDetail.title}
                            </Text>
                            {movieDetail.genres && (
                                <View style={styles.genresContainer}>
                                    {movieDetail.genres.map((genre) => (
                                        <Text
                                            style={styles.genre}
                                            key={genre.id}
                                        >
                                            {genre.name}
                                        </Text>
                                    ))}
                                </View>
                            )}
                            <StarRating
                                maxStars={5}
                                disabled={true}
                                fullStarColor={'gold'}
                                rating={movieDetail.vote_average / 2}
                                starSize={24}
                            />
                            <Text style={styles.overview}>
                                {movieDetail.overview}
                            </Text>
                            <Text style={styles.release}>
                                {'Release date: ' +
                                    dateFormat(
                                        movieDetail.release_date,
                                        'mmmm dd, yyyy'
                                    )}
                            </Text>
                        </View>
                    </ScrollView>
                    <Modal animationType="slide" visible={modalVisible}>
                        <View style={styles.videoModal}>
                            <Pressable onPress={() => videoShown()}>
                                <Text>VIDEO HERE</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
            ) : (
                <ActivityIndicator size="large" />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        height: dimensions.height * 0.33
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 15
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        position: 'relative'
    },
    genre: {
        fontSize: 12,
        fontWeight: '300',
        marginHorizontal: 5,
        textTransform: 'uppercase'
    },
    genresContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    overview: {
        padding: 15
    },
    release: {
        fontWeight: 'bold'
    },
    playButton: {
        position: 'absolute',
        top: -25,
        right: 5
    },
    videoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Detail;
