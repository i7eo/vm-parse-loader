# vm-parse-loader

利用 velocityjs 处理 `#parse` 
删除注释

## 使用

```javascript
{
    test: /\.vm$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'img:data-src', 'audio:src'],
          minimize: false
        }
      },
      {
        loader: path.resolve(__dirname, 'vm-parse-loader'),
        options: {
          basePath: path.join(__dirname, '../'),
          removeComments: !isDev
        }
      }
    ]
}
```

1. `basePath` 指与 src 同级的目录
2. `removeComments` 是否删除注释 default: true

