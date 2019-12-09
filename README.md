# Boostrap 4 Grid with sass @mixin

## Example HTML

```
<div class="section">
    <div class="section__row">
      <div class="section__card">
        <div class="section__title">
          <h2>Lorem ipsum</h2>
        </div>
      </div>
    </div>
  </div>
```

## Example on SASS

```
.section{
  @include container;

  .section__row{
    @include make-row;

    .section__card{
      @include make-xs-column(12);
      @include make-sm-column(6);
      @include make-md-column(3);
      @include make-lg-column(4);
    }
  }
}
```
