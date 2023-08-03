import React, { Component } from 'react'
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';

export class TopBanner extends Component {
    render() {
        const { data } = this.props;
        return (
            <div>
                {data.displayVideo === "true" ? (
                    <video width="100%" height="auto" controls>
                        <source src={data.video} type="video/mp4" />
                    </video>
                ) : (
                    <Div style={{ position: 'relative' }}>
                        <Img src={data.image} alt=""  width="100%" />
                        <Text p="0px 3.5rem" ta="center" width="100%" fontSize="2rem" color="#17245B" style={{
                            position: 'absolute',
                            top: '5rem',
                            fontWeight: 'bold',
                            lineHeight: '40px'
                        }}>{data.text}</Text>
                    </Div>
                )}
            </div>
        )
    }
}

export default TopBanner
