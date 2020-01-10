# @http-ext/plugin-retry

> A retry plugin for [HttpExt](https://github.com/jscutlery/http-ext).

This plugin retries network requests using a configurable back-off strategy.

## Requirements

The plugin requires `@http-ext/core` and `@http-ext/angular` to be installed.

## Installation

```bash
yarn add @http-ext/plugin-retry
```

or

```bash
npm install @http-ext/plugin-retry
```

## Usage

The whole configuration object is optional.

```ts
import { HttpExtModule } from '@http-ext/angular';
import { createRetryPlugin } from '@http-ext/plugin-retry';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpExtModule.forRoot({
      plugins: [createRetryPlugin()]
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Available options

You can give a partial configuration object it will be merged with default values.

| Property            | Type                  | Default value                         |
| ------------------- | --------------------- | ------------------------------------- |
| `initialIntervalMs` | `number`              | `200`                                 |
| `maxIntervalMs`     | `number`              | `60000`                               |
| `maxRetries`        | `number`              | `10`                                  |
| `shouldRetry`       | `response => boolean` | `response => response.status !== 404` |
| `condition`         | `RequestCondition`    | `() => true`                          |

Here is an example passing a configuration object.

```ts
import { MemoryStorage } from '@http-ext/plugin-cache';

@NgModule({
  imports: [
    HttpExtModule.forRoot({
      plugins: [
        createRetryPlugin({
          initialIntervalMs: 1000,
          maxIntervalMs: 120000, // 2 min
          maxRetries: 15
        })
      ]
    })
  ]
})
export class AppModule {}
```