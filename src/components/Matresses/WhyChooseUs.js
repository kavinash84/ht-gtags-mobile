import React, { Component } from 'react'
import Div from 'hometown-components/lib/Div';
import Heading from'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Text from 'hometown-components/lib/Text';

export class WhyChooseUs extends Component {
    render() {
        const { data } =this.props;
        return (
            <Div mt="2rem">
                <Heading fontSize="22px" ta="center" p="0px 3rem" mb="5px" mt="0px" style={{
                    fontWeight: 'bold',
                    color:"#323231",
                    lineHeight:"36px",
                    whiteSpace: 'normal'
                }}
                >
                    {data.title}
                </Heading>
                <div style={{ width: '25px', borderTop: '2px solid #323231', margin: 'auto' }}></div>
                {data.sections.length ? data.sections.map((section, index) => (
                    <Div key={index} mt="1rem" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Div style={{width:"60%"}}>
                            <Img src={section.image} alt={section.header} width="120px" height="120px" m="auto" />
                        </Div>
                        <Heading ta="center" p="0px 2rem" mb="0rem" fontSize="20px" style={{
                            color: '#323231',
                            whiteSpace: 'normal',
                            lineHeight:"40px",
                        }}>
                            {section.header}
                        </Heading>
                        <Text ta="center" p="0px 1rem" color="#323231" fontSize="1rem" style={{
                            lineHeight: '28px'
                        }}>
                            {section.description}
                        </Text>
                    </Div>
                )): null}
            </Div>
        )
    }
}

export default WhyChooseUs
