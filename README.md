# AngularLibraries

## Dependencies

- Angular
- Angular Material
- jwtdecode

## Building the library

In angular-libraries
```
npx ng build common-components --configuration production
cd dist/common-components
```

This produces an archive file that can be copied and installed from another project
```
npm install /absolute/path/to/dist/common-components/common-components-1.0.0.tgz
```
