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

建议与 `vm-data-loader` 一起使用更香
[vm-data-loader]()

一起使用的时候请注意： vm-parse-loader 必须在 vm-data-loader 之前避免#parse被吃掉

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
         loader: path.resolve(__dirname, 'vm-data-loader'),
         options: {
            dataPath: `./backend-data.json`
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

1. dataPath 是 mock 后传给模版的json数据

