'use strict';

function showComments(list) {
  
  const commentsContainer = document.querySelector('.comments');
  const comments = document.createDocumentFragment();
  
  list.forEach(comment => {
    comments.appendChild(createComment(commentTemplate(comment)));
  });
  commentsContainer.appendChild(comments);  
}

function commentTemplate(comment) {
  
  return {
    tag: 'div',
    cls: 'comment-wrap',
    content: [
      {
        tag: 'div',
        cls: 'photo',
        attr: {
          title: comment.author.name   
        },
        content: {
          tag: 'div',
          cls: 'avatar',
          attr: {
            style: `background-image: url(${comment.author.pic})`
          }
        }
      },
      {
        tag: 'div',
        class: 'comment-block',
        content: [
          {
            tag: 'p',
            cls: 'comment-text',
            content: comment.text.split('\n').map(el => {
              return {content: (el) ? el: {tag: 'br'}}
            }),  
          },
          {
            tag: 'div',
            cls: 'bottom-comment',
            content: [
              {
                tag: 'div',
                cls: 'comment-date',
                content: new Date(comment.date).toLocaleString('ru-Ru')
              },
              {tag: 'ul',
               cls: 'comment-actions',
                content: [
                  {
                    tag: 'li',
                    cls: 'complain',
                    content: 'Пожаловаться'
                  },
                  {
                    tag: 'li',
                    cls: 'reply',
                    content: 'Ответить'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

function createComment(comment) {  
  if ((comment === undefined) || (comment === null) || (comment === false)) {
      return document.createTextNode('');
   }

   if ((typeof comment === 'string') || (typeof comment === 'number') || (comment === true)) {
       return document.createTextNode(comment);
   }

   if (Array.isArray(comment)) {
       return comment.reduce((f, elem) => {
           f.appendChild(createComment(elem));
           return f;
       }, document.createDocumentFragment());
   }

   var element = document.createElement(comment.tag || 'div');
   [].concat(comment.cls || [])
       .forEach(className => element.classList.add(className));
   if (comment.attr) {
       Object.keys(comment.attr)
           .forEach(key => element.setAttribute(key, comment.attr[key]))
   }

   element.appendChild(createComment(comment.content));

   return element;
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
  
