import Navbar from '@/components/Navbar'

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{ children }</main>
  </>
)

export default Layout