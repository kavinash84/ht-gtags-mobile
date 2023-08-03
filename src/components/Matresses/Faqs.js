import React, { Component } from 'react'
import Div from 'hometown-components/lib/Div'
import Heading from 'hometown-components/lib/Heading'
import Text from 'hometown-components/lib/Text'
import Img from 'hometown-components/lib/Img'

export class Faqs extends Component {
    state={
        showAns: false,
        ansNum: 0,
        showMore: false,
        faqs: this.props.data.values,
        faqsFull: this.props.data.values,
        faqsShort: this.props.data.values.slice(0,4)
    }

    componentDidMount = () => {
        this.updateFaqs();
    }

    updateFaqs = () => {
        this.setState({
            faqs: this.state.faqs.slice(0,4)
        }, () => console.log('triggered'))
    }

    handleFaq = index => {
        if(index === this.state.ansNum) {
            this.setState({
                showAns: !this.state.showAns,
                ansNum: index
            })
        } else {
            this.setState({
                showAns: true,
                ansNum: index
            })
        }
    }

    handleShowMore = () => {
        this.setState({
            showMore: !this.state.showMore,
        }, () => {
            if(this.state.showMore) {
                this.setState({
                    faqs: this.state.faqsFull
                })
            } else {
                this.setState({
                    faqs: this.state.faqsShort
                }, () => console.log(this.state.faqs))
            }
        })
    }

    render() {
        const { data } = this.props;
        const { showAns, ansNum, faqs } = this.state;
        return (
            <Div mt="2rem">
                <Div p="1rem 0px" style={{ backgroundColor: '#69878B', borderBottom: '2px solid white' }}>
                    <Heading p="1rem 1.5rem" mt="0.5rem" mb="5px" fontSize="22px" ta="center" p="0px 1rem" style={{
                        fontWeight: 'bold',
                        color:"#FFFFFF",
                        lineHeight:"36px",
                        whiteSpace: 'normal',
                    }}>{data.title}</Heading>
                    <div style={{ width: '25px', borderTop: '2px solid #323231', margin: 'auto' }}></div>
                </Div>
                {faqs.length ? faqs.map((elem, index) => (
                    <Div key={index} p="0.5rem 1.5rem" pb="0px" style={{ backgroundColor: `${showAns && ansNum === index ? '#FFFFFF': '#69878B'}`}} onClick={() => this.handleFaq(index)}>
                        <Div pb="0.5rem" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid white'
                        }}>
                            <Text fontSize="14px" style={{
                                fontWeight: 'bold',
                                color: `${showAns && ansNum === index ? '#323131': '#FFFFFF'}`
                            }}>{elem.ques}
                            </Text>
                            { showAns && ansNum === index ? (<Img src={data.arrowDown} alt="arrowDown" ml="0.4rem" width="20px" />):(<Img src={data.arrow} alt="arrow" width="10px" ml="0.4rem"/>) }
                        </Div>
                        { showAns && ansNum === index ? (<Text color="#999999" fontSize="14px">{elem.ans}</Text>) : null }
                    </Div>
                )): null}
                {faqs.length > 3 ? (
                    <Div onClick={this.handleShowMore}>
                        <Text
                            ta="center"
                            fontSize="12px"
                            style={{
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}>
                                {faqs.length > 4 ? 'SHOW LESS' : 'SHOW MORE'}
                            <span
                                style={{
                                    fontSize: '1rem',
                                    marginTop: '0.3rem',
                                    marginLeft: '0.5rem',
                                    fontWeight: 'bold'
                                }}>
                                    →
                            </span>
                        </Text>
                    </Div>
                ) : null}
            </Div>
        )
    }
}

export default Faqs
