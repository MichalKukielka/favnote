import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserPageTemplate from './UserPageTemplate';
import Input from 'components/atoms/Input/Input';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import withContext from 'hoc/withContext';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import plusIcon from 'assets/icons/plus.svg';

const StyledWrapper = styled.div`
  position: relative;
  padding: 25px 150px 25px 70px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 85px;
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0 0;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledButtonIcon = styled(ButtonIcon)`
  background-color: ${({ activeColor, theme }) => theme[activeColor]};
  border-radius: 50%;
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-size: 35%;
  z-index: 10000;
`;

class GridTemplate extends React.Component {
  state = {
    isNavItemBarVisible: false,
  };

  handleNewItemBarToggle = () =>
    this.setState(prevState => ({
      isNavItemBarVisible: !prevState.isNavItemBarVisible,
    }));

  render() {
    console.log(this.state.isNavItemBarVisible);
    const { children, pageContext } = this.props;
    const { isNavItemBarVisible } = this.state;
    return (
      <UserPageTemplate pageType={pageContext}>
        <StyledWrapper>
          <StyledPageHeader>
            <Input search placeholder="Search" />
            <StyledHeading big as="h1">
              {pageContext}
            </StyledHeading>
            <StyledParagraph>6 {pageContext}</StyledParagraph>
          </StyledPageHeader>
          <StyledGrid>{children}</StyledGrid>
          <StyledButtonIcon
            icon={plusIcon}
            activeColor={pageContext}
            onClick={this.handleNewItemBarToggle}
          />
          <NewItemBar handleClose={this.handleNewItemBarToggle} isVisible={isNavItemBarVisible} />
        </StyledWrapper>
      </UserPageTemplate>
    );
  }
}

GridTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  children: PropTypes.array.isRequired,
};

GridTemplate.defaultProps = {
  pageContext: 'notes',
};

export default withContext(GridTemplate);
