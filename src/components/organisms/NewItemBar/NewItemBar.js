import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';
import Heading from 'components/atoms/Heading/Heading';
import { connect } from 'react-redux';
import { addItem as addItemAction } from 'actions';
import { Formik, Form } from 'formik';

const StyledWrapper = styled.div`
  border-left: 10px solid ${({ theme, activeColor }) => theme[activeColor]};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 100px 90px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100vh;
  width: 680px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: 0.25s ease-in-out;
`;

const StyledTextArea = styled(Input)`
  margin: 30px 0 100px;
  border-radius: 20px;
  height: 30vh;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-top: 30px;
`;
const NewItemBar = ({ pageContext, isVisible, addItem, handleClose }) => (
  <StyledWrapper isVisible={isVisible} activeColor={pageContext}>
    <Heading big>Create new {pageContext}</Heading>
    <Formik
      initialValues={{ title: '', content: '', articleUrl: '', twitterName: '', created: '' }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting = false;
        addItem(pageContext, values);
        handleClose();
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <StyledForm>
          <StyledInput
            type="text"
            name="title"
            placeholder="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          {pageContext === 'twitters' && (
            <StyledInput
              type="text"
              name="twitterName"
              placeholder="twitter name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.twitterName}
            />
          )}
          {pageContext === 'articles' && (
            <StyledInput
              type="text"
              name="articleUrl"
              placeholder="link"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.articleUrl}
            />
          )}
          <StyledTextArea
            name="content"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.content}
          />
          <Button type="submit" activeColor={pageContext}>
            Add Note
          </Button>
        </StyledForm>
      )}
    </Formik>
  </StyledWrapper>
);

NewItemBar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
};

NewItemBar.defaultProps = {
  pageContext: 'notes',
};

const mapDispatchToProps = dispatch => ({
  addItem: (itemType, itemContent) => dispatch(addItemAction(itemType, itemContent)),
});

export default connect(null, mapDispatchToProps)(withContext(NewItemBar));
