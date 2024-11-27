import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import MovieCard from '../movie-card/MovieCard';

const MovieList = props => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);  // Thêm loading state
    const [error, setError] = useState(null);      // Thêm state xử lý lỗi

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            setLoading(true);  // Bắt đầu tải dữ liệu

            try {
                if (props.type !== 'similar') {
                    switch (props.category) {
                        case category.movie:
                            response = await tmdbApi.getMoviesList(props.type, { params });
                            break;
                        default:
                            response = await tmdbApi.getTvList(props.type, { params });
                    }
                } else {
                    response = await tmdbApi.similar(props.category, props.id);
                }
                setItems(response.results);
            } catch (error) {
                setError("Failed to fetch data.");  // Cập nhật lỗi nếu có
            } finally {
                setLoading(false);  // Dữ liệu đã được tải xong
            }
        };

        getList();
    }, [props.category, props.type, props.id]);  // Thêm dependency để gọi lại API khi props thay đổi

    // Hiển thị thông báo lỗi hoặc loading
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="movie-list">
            {items.length === 0 ? (
                <div>No movies found</div>  // Hiển thị nếu không có phim
            ) : (
                <Swiper
                    grabCursor={true}
                    spaceBetween={10}
                    slidesPerView={'auto'}
                >
                    {
                        items.map((item, i) => (
                            <SwiperSlide key={i}>
                                <MovieCard item={item} category={props.category} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            )}
        </div>
    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number,  // Đảm bảo id là một giá trị số (nếu có)
}

export default MovieList;
