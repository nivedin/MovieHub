import React,{ useEffect,useState} from 'react';
import { API_URL,API_KEY,IMAGE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import { Descriptions,Button,Row,Card,Col } from 'antd';
import Favorite from './Sections/Favorite';

const { Meta } = Card;

function MovieDetailPage(props) {

    const movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([])
    const [Crews, setCrews] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {


        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
           .then(response => response.json())
           .then(response => {
               console.log(response);
               setMovie(response);

               fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                .then(response => response.json())
                .then(response => {
               console.log(response);
               setCrews(response.cast);
                })
           })
    },[])


    const handleClick = () => {

        setActorToggle(!ActorToggle)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })

    return (
        <div >
            {Movie&& 
            <MainImage image={`${IMAGE_URL}w1280${Movie.backdrop_path && Movie.backdrop_path}`}
                    title={Movie.original_title} text={Movie.overview}
                />
            }
                <div style={{width:'85%',margin:'1rem auto' }}>
                    <div style={{ display:'flex', justifyContent:'flex-end'}}>
                    <Favorite userFrom={localStorage.getItem('userId')}  movieId={movieId} movieInfo={Movie}/>
                    </div>
                </div>
               <div style={{padding:'20px'}}>
                <Descriptions title="Movie Info" bordered>
                    <Descriptions.Item label="Title">{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="Release Date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="Revenue">{formatter.format(Movie.revenue)}</Descriptions.Item>
                    <Descriptions.Item label="Runtime">{((Movie.runtime)/60).toPrecision(2)}hrs</Descriptions.Item>
                    <Descriptions.Item label="Average Vote" span={2}>
                    {Movie.vote_average}
                    </Descriptions.Item>
                    <Descriptions.Item label="Vote Count">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="Status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label="Popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

                <div style={{width:'85%',margin:'1rem auto' }}>
                    <div style={{ display:'flex', justifyContent:'center'}}>
                        <Button  type="ghost"  onClick={handleClick}>Actors List</Button>
                    </div>
                </div>


               {ActorToggle && 
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {Crews && Crews.map((crew, index) => (
                        <React.Fragment key={index}>
                        {console.log(crew)}
                            {crew.profile_path && 
                            <Col className="gutter-row" span={6} style={{paddingBottom:"15px"}}>
                                <Card hoverable 
                                 cover={<img alt="actor" src={`${IMAGE_URL}w500${crew.profile_path}`}/>}

                            >
                                <Meta title={crew.name} description={crew.character}/>
                            </Card>
                            </Col>
                            }
                        </React.Fragment>
                    ))}
                </Row>
               }

               </div>
        
        </div>
    )
}

export default MovieDetailPage
