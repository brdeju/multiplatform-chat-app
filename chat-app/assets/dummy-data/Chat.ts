export default {
	id: '1',
	users: [{
		id: 'u1',
		name: 'Greg',
	}, {
		id: 'u2',
		name: 'Adam',
	}],
	messages: [{
		id: 'm1',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		createdAt: '2021-10-24T12:48:00.000Z',
		user: {
			id: 'u1',
			name: 'Greg',
		},
	}, {
		id: 'm2',
		content: 'Morbi id erat metus.',
		createdAt: '2021-10-24T14:49:00.000Z',
		user: {
			id: 'u2',
			name: 'Adam',
		},
	}, {
		id: 'm3',
		content: 'Curabitur at varius justo. Fusce dignissim fermentum purus, vitae ornare quam dignissim eu.',
		createdAt: '2021-10-25T14:49:40.000Z',
		user: {
			id: 'u2',
			name: 'Adam',
		},
	}, {
		id: 'm4',
		content: 'Mauris consectetur vestibulum velit a viverra.',
		createdAt: '2021-10-25T14:50:00.000Z',
		user: {
			id: 'u1',
			name: 'Greg',
		},
	}, {
		id: 'm5',
		content: 'Fusce lacinia enim porta, pulvinar ligula eu, auctor elit. Vestibulum mattis dignissim cursus. Sed porttitor nunc id dolor lacinia imperdiet.',
		createdAt: '2021-10-26T14:51:00.000Z',
		user: {
			id: 'u1',
			name: 'Greg',
		},
	}, {
		id: 'm6',
		content: 'Integer finibus sodales libero, ac tristique orci placerat finibus.',
		createdAt: '2021-10-27T14:49:00.000Z',
		user: {
			id: 'u2',
			name: 'Adam',
		},
	}, {
		id: 'm7',
		content: 'Curabitur ac magna leo.',
		createdAt: '2021-10-27T14:53:00.000Z',
		user: {
			id: 'u2',
			name: 'Adam',
		},
	}]
}
