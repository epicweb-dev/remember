<div>
  <h1 align="center"><a href="https://npm.im/@epic-web/remember">🤔 @epic-web/remember</a></h1>
  <strong>
    Simple, type-safe, "singleton" implementation.
  </strong>
  <p>
    For when your "hot module replacement" involves re-evaluating a module, but
    you don't want to actually re-evaluate a portion of it.
  </p>
</div>

```
npm install @epic-web/remember
```

<div align="center">
  <a
    alt="Epic Web logo"
    href="https://www.epicweb.dev"
  >
    <img
      width="300px"
      src="https://github-production-user-asset-6210df.s3.amazonaws.com/1500684/257881576-fd66040b-679f-4f25-b0d0-ab886a14909a.png"
    />
  </a>
</div>

<hr />

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![GPL 3.0 License][license-badge]][license]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## The problem

You're using a framework like Remix with
[`--manual` mode](https://remix.run/docs/en/guides/manual-mode) and
re-evaluating your modules on every change. But you have some state that you
don't want to lose between changes. For example:

- Database connections
- In-memory caches

## This solution

This was copy/paste/modified/tested from
[@jenseng's `abuse-the-platform` demo](https://github.com/jenseng/abuse-the-platform/blob/2993a7e846c95ace693ce61626fa072174c8d9c7/app/utils/singleton.ts)
(ISC). It's basically a type-safe singleton implementation that you can use to
keep state between module re-evaluations.

## Usage

```tsx
import { remember } from '@epic-web/remember'

export const prisma = remember('prisma', () => new PrismaClient())
```

Keep in mind that any changes you make within that callback will not be
reflected when the module is re-evaluated (that's the whole point). So if you
need to change the callback, then you'll need to restart your server.

## License

MIT

## Credit

The original code was written by [@jenseng](https://github.com/jenseng) and then
I modified it and published it to fit my needs.

<!-- prettier-ignore-start -->
[build-badge]: https://img.shields.io/github/actions/workflow/status/epicweb-dev/remember/release.yml?branch=main&logo=github&style=flat-square
[build]: https://github.com/epicweb-dev/remember/actions?query=workflow%3Arelease
[license-badge]: https://img.shields.io/badge/license-GPL%203.0%20License-blue.svg?style=flat-square
[license]: https://github.com/epicweb-dev/remember/blob/main/LICENSE
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://kentcdodds.com/conduct
<!-- prettier-ignore-end -->
