import test from 'ava';
import { shallow } from 'enzyme';
import RepositoryName from './RepositoryName';
import React from 'react';


const mockItem = {
    repoAuthor: 'testUser',
    repoName: 'testName'
}

test('render component when pass data', t => {
    const wrapper = shallow(<RepositoryName repoAuthor={mockItem.repoAuthor} repoName={mockItem.repoName} />);
    t.true( wrapper.text().includes(mockItem.repoAuthor) )
});


test('render empty div when data empty', t => {
    const wrapper = shallow(<RepositoryName />);
    t.true( wrapper.text() === '' )
});
