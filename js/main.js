Vue.component('product', {

  props: {
    premiun: {
      type: Boolean,
      required: true
    } 
  },

  template: `
    <div class="product">
        
        <div class="product-image">
          <!-- : is short of v-bind -->
          <img :src="image" alt="avatar">
        </div>

        <div class="product-info">
          <h1>{{ title }}</h1>
          <!-- Conditional rendering -->
          <p v-if='inStock'>In Stock</p>
          <p v-else >Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>

          <!-- V for -->
          <ul>
            <li v-for="detail in details" >{{ detail }}</li>
          </ul>

          <div v-for="(variant, index ) in variants" 
              :key='variant.variantId'
              class="color-box"
              :style="{ backgroundColor: variant.variantColor }"
              @mouseover='updateProduct(index)'>
          </div>
          
          
            <button v-on:click='addToCart' 
                    :disabled='!inStock' 
                    :class="{ disabledButton: !inStock }">Add to Cart</button>

        </div>
      </div>
  `,
  data (){
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [ 
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green-onWhite.jpg",
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./assets/vmSocks-blue-onWhite.jpg",
          variantQuantity: 0,
        }
      ],
    }
  }, 
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId) 
    },
    updateProduct( index ) {
      this.selectedVariant = index
    }
  },
  computed: {
    title () {
      return `${this.brand} ${this.product}` 
    },
    image () {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock () {
      return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
      if ( this.premiun ) {
        return "Free"
      }
      return 2.99
    }
  }
})



const app = new Vue({
  el: '#app',
  data: {
    premiun: true,
    cart: [],
  },
  methods: {
    updateCart ( id ) {
      this.cart.push(id)
    }
  }
})